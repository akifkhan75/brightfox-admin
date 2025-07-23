import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../components/common/Card.tsx';
import { Button } from '../../components/common/Button.tsx';
import { Input } from '../../components/common/Input.tsx';
import { Modal } from '../../components/common/Modal.tsx';
import { PlusIcon } from '../../components/icons.tsx';
import { AppDispatch, RootState } from '../../store/store.ts';
import { fetchMessages, markAsRead } from '../../store/slice/messages/messagesSlice.ts';
import { Message } from '../../../types.ts';

const Communications: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { items: messages, status } = useSelector((state: RootState) => state.messages);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [isComposeOpen, setComposeOpen] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMessages());
        }
    }, [status, dispatch]);
    
    useEffect(() => {
        if (messages.length > 0 && !selectedMessage) {
            setSelectedMessage(messages[0]);
            if (!messages[0].isRead) {
                dispatch(markAsRead(messages[0].id));
            }
        }
    }, [messages, selectedMessage, dispatch]);

    const handleSelectMessage = (message: Message) => {
        setSelectedMessage(message);
        if (!message.isRead) {
            dispatch(markAsRead(message.id));
        }
    };

    return (
        <div className="p-8 h-full">
            <Card className="h-full flex overflow-hidden">
                {/* Message List */}
                <div className="w-1/3 border-r border-slate-200 dark:border-slate-700 flex flex-col">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Inbox ({messages.filter(m => !m.isRead).length})</h2>
                        <Button onClick={() => setComposeOpen(true)} variant="ghost" size="sm" leftIcon={<PlusIcon className="w-4 h-4"/>}>Compose</Button>
                    </div>
                    <ul className="overflow-y-auto">
                        {messages.map(msg => (
                            <li key={msg.id} onClick={() => handleSelectMessage(msg)}
                                className={`p-4 cursor-pointer border-l-4 ${selectedMessage?.id === msg.id ? 'bg-slate-100 dark:bg-slate-700 border-primary' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                <div className="flex justify-between items-start">
                                    <p className={`font-semibold ${!msg.isRead ? 'text-slate-800 dark:text-slate-100' : 'text-slate-600 dark:text-slate-300'}`}>{msg.sender}</p>
                                    {!msg.isRead && <div className="w-2.5 h-2.5 bg-primary rounded-full flex-shrink-0 mt-1.5"></div>}
                                </div>
                                <p className={`text-sm truncate ${!msg.isRead ? 'text-slate-700 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>{msg.subject}</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{msg.snippet}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Message View */}
                <div className="w-2/3 p-6 flex flex-col">
                    {selectedMessage ? (
                        <>
                            <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{selectedMessage.subject}</h3>
                                <div className="flex items-center space-x-3 mt-2">
                                    <img src={selectedMessage.avatarUrl} alt={selectedMessage.sender} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold">{selectedMessage.sender}</p>
                                        <p className="text-sm text-slate-500">to Me</p>
                                    </div>
                                    <p className="text-sm text-slate-400 ml-auto">{selectedMessage.timestamp}</p>
                                </div>
                            </div>
                            <div className="flex-grow py-6 text-slate-700 dark:text-slate-300 leading-relaxed overflow-y-auto">
                               {selectedMessage.content}
                            </div>
                        </>
                    ) : (
                        <div className="flex-grow flex items-center justify-center text-slate-500">Select a message to read.</div>
                    )}
                </div>
            </Card>

            <Modal isOpen={isComposeOpen} onClose={() => setComposeOpen(false)} title="Compose Message">
                <form className="space-y-4">
                    <Input label="To" placeholder="Recipient's name or email" />
                    <Input label="Subject" placeholder="Message subject" />
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                        <textarea rows={6} className="block w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Write your message..."></textarea>
                    </div>
                     <div className="flex justify-end space-x-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setComposeOpen(false)}>Cancel</Button>
                        <Button type="submit">Send</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Communications;
