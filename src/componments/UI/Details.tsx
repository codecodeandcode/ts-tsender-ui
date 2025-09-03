import React from "react";

interface TokenDetailsProps {
    amountWei: string;
    amountTokens: string;
    tokenName: string;
}

const TokenDetails: React.FC<TokenDetailsProps> = ({
    amountWei,
    amountTokens,
    tokenName,
}) => {
    return (
        <div className="w-full">
            {/* Details标签在框的外面上方 */}
            <h2 className="text-lg font-medium text-gray-700 mb-2">Details</h2>

            {/* 内容框：改成和 InputField 一样的背景/边框 */}
            <div className="w-full p-4 border border-gray-300 rounded-md shadow-sm bg-white">
                <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Amount (wei):</span>
                        <span className="text-gray-900 font-mono">{amountWei}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Amount (tokens):</span>
                        <span className="text-gray-900">{amountTokens}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">Token Name:</span>
                        <span className="text-gray-900">{tokenName}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TokenDetails;