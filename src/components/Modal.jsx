import React from 'react'
import Button from './Button';

const Modal = ({ isOpen, type, onClose, onConfirm, children, setSchedulesHistory }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            { /* Confirmar excluir horário  */
                type === "confirmRemoveTime" ? (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        {children}
                        <div className="mt-4 flex justify-center gap-4">
                            <Button variant="outline" onClick={onClose}>Cancelar</Button>
                            <Button onClick={onConfirm}>Confirmar</Button>
                        </div>
                    </div>
                )
                    : <></>
            }

            {/* Mostrar registro de horários  */
                type === "history" ? (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-medium dark:text-white">Registro de Horários:</h2>
                        <br />
                        {children}
                        <div className="mt-4 flex justify-center gap-4">
                            <Button variant="outline" onClick={onClose}>Fechar</Button>
                            <Button onClick={() => setSchedulesHistory([])}>Apagar Todos</Button>
                        </div>
                    </div>
                )
                    : <></>
            }
        </div>
    );
}

export default Modal