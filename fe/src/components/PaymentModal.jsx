import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

export default function PaymentModal({ isOpen, onClose }) {
    const { user } = useUser();
    const username = user?.username || user?.firstName || "Guest";

    // Using the exact VietQR URL provided by the user, dynamically appending the transfer message
    // Example format: VietQR generates strict transfer syntax based on addInfo value.
    const transferMessage = `NAPTIEN_${username}`.toUpperCase().replace(/[^A-Z0-9_]/g, "");
    const qrUrl = `https://img.vietqr.io/image/VCCB-0868280250-compact.png?amount=50000&addInfo=${transferMessage}`;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-[#1e1e24] border border-[#2d2d35] p-6 text-left align-middle shadow-2xl transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-bold leading-6 text-white"
                                    >
                                        Nạp Tiền / Deposit
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <p className="text-gray-300 text-sm text-center">
                                        Quét mã QR dưới đây bằng ứng dụng ngân hàng hoặc ví điện tử (MoMo, ZaloPay...) để thanh toán.
                                    </p>

                                    <div className="bg-white p-4 rounded-xl shadow-lg">
                                        <img
                                            src={qrUrl}
                                            alt="VietQR Payment Code"
                                            className="w-64 h-64 object-contain"
                                        />
                                    </div>

                                    <div className="bg-[#2d2d35] w-full p-4 rounded-lg mt-4 border border-[#3d3d45]">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-400 text-sm">Ngân hàng:</span>
                                            <span className="text-white font-semibold text-sm">VietCapital Bank (Ban Viet)</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-400 text-sm">Số tài khoản:</span>
                                            <span className="text-white font-semibold text-sm">0868280250</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-400 text-sm">Số tiền đề xuất:</span>
                                            <span className="text-green-400 font-bold text-sm">50,000 VND</span>
                                        </div>
                                        <div className="flex justify-between border-t border-[#4d4d55] pt-2 mt-2">
                                            <span className="text-gray-400 text-sm">Nội dung chuyển khoản:</span>
                                            <span className="text-blue-400 font-mono text-sm break-all text-right max-w-[150px]">{transferMessage}</span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-yellow-500/80 text-center italic mt-2">
                                        *Lưu ý: Vui lòng nhập đúng nội dung chuyển khoản để hệ thống xác nhận tự động.
                                    </p>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
