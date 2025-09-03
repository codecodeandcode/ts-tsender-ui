//组件的内容设置
"use client"
import { useMemo, useState, useEffect } from "react"
import InputField from "./UI/InputField"
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/constants";
import { useChainId, useConfig, useAccount, useWriteContract, useReadContracts } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { caculateTotal } from "@/utils/caculateTotal/caculateTotal";
import TokenDetails from "@/componments/UI/Details";

export default function AirdropForm() {
    const [tokenAddress, setTokenAdress] = useState("");//实时更新tokenAddress的状态
    const [Recipients, setRecipients] = useState("");
    const [Amount, setAmount] = useState("");
    // ✅ 在组件加载时恢复 localStorage 里的值
    useEffect(() => {
        const savedToken = localStorage.getItem("tokenAddress");//在刚开始检查有没有保存的值
        const savedRecipients = localStorage.getItem("Recipients");
        const savedAmount = localStorage.getItem("Amount");
        if (savedToken) setTokenAdress(savedToken);//有就恢复
        if (savedRecipients) setRecipients(savedRecipients);
        if (savedAmount) setAmount(savedAmount);
    }, []);//[]是空 只在刷新重新加载

    // ✅ 每次输入变化时保存到 localStorage
    useEffect(() => {
        localStorage.setItem("tokenAddress", tokenAddress);
    }, [tokenAddress]);//state改变就刷新

    useEffect(() => {
        localStorage.setItem("Recipients", Recipients);
    }, [Recipients]);//state改变就刷新

    useEffect(() => {
        localStorage.setItem("Amount", Amount);
    }, [Amount]);//state改变就刷新

    const chainID = useChainId();
    const config = useConfig();
    const account = useAccount();
    const total: number = useMemo(() => caculateTotal(Amount), [Amount])
    const { data: tokenData } = useReadContracts({
        contracts: [
            {
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: "name"
            },
            {
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: "decimals"
            },
        ]

    })

    //useMemo()只在Amount的变量改变时 重新渲染和计算
    //第一个Amount是传入的参数 第二个[Amount]是依赖项当[Amount]改变时useMemo会重新计算
    //()是匿名函数 useMemo()要求两个函数

    const { data: hash, isPending, writeContractAsync } = useWriteContract();
    async function getApprovedAmount(tSenderAddress: string | null): Promise<number> {
        if (!tSenderAddress) {
            alert("No address found,Please use a supported chain");
            return 0;
        }
        const response = await readContract(config, {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "allowance",
            args: [account.address, tSenderAddress as `0x${string}`]
        })//token.allowance(address,tsender)


        return response as number;
    }
    async function handleSubmit() {
        //获取tsender在不同chain的address
        const tSenderAddress = chainsToTSender[chainID]["tsender"]
        const approvedamount = await getApprovedAmount(tSenderAddress);
        if (approvedamount < total) {
            //不需要传入config因为readContract来自Wagmi 而不是wagmi/core, readContract是一个hook 已经拥有所需要的config
            const approvalHash = await writeContractAsync({
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: "approve",
                args: [tSenderAddress as `0x${string}`, BigInt(total)]
            })
            const approvalReceipt = await waitForTransactionReceipt(config, {
                hash: approvalHash
            })
            console.log("Approval confirmed", approvalReceipt);
            await writeContractAsync({
                abi: tsenderAbi,
                address: tSenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [tokenAddress,
                    // Comma or new line separated
                    Recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    Amount.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== '').map(a => BigInt(a)),
                    BigInt(total),],

            })
        }
        else await writeContractAsync({
            abi: tsenderAbi,
            address: tSenderAddress as `0x${string}`, //为什么地址不一样
            functionName: "airdropERC20",
            args: [tokenAddress,
                // Comma or new line separated
                Recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                Amount.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== '').map(a => BigInt(a)),
                BigInt(total),],

        })
    }
    return (
        <div>
            <InputField
                label="token Address"
                placeholder="0x"
                value={tokenAddress}
                onChange={e => setTokenAdress(e.target.value)}
            />

            <InputField
                label="Recipients"
                placeholder="0x12313,0x234,0x2341234...."
                value={Recipients}
                onChange={e => setRecipients(e.target.value)
                }
                large={true}
            />

            <InputField
                label="Amount"
                placeholder="100,200,300...."
                value={Amount}
                onChange={e => setAmount(e.target.value)}
                large={true}
            />
            <TokenDetails
                amountWei={total.toString()}
                amountTokens={
                    tokenData?.[1]?.result
                        ? Math.max(0, Number(total) / 10 ** (tokenData[1].result as number))
                            .toFixed(tokenData[1].result as number) // 使用与小数位数相同的精度
                        : "0"
                }
                tokenName={tokenData?.[0]?.result as string || "Unknown"}
            />

            <label>Transactionhash:{hash}</label>

            <button
                onClick={handleSubmit}
                disabled={isPending} // pending 时禁用按钮
                className={`
    px-6 py-2 
    ${isPending ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"} 
    text-white font-semibold 
    rounded-xl 
    shadow-md hover:shadow-lg 
    hover:scale-105 active:scale-95 
    transition-all duration-200
    flex items-center justify-center gap-2
  `}
            >
                {isPending ? (
                    <>
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        Sending...
                    </>
                ) : (
                    "🚀 Send Tokens"
                )}
            </button>


        </div>
    )
}