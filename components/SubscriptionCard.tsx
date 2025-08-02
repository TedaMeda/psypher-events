export default function SubscriptionCard({tier}:{tier:string}){
    return <div className="border rounded-2xl h-50 p-10 m-5 w-50">
        <div className="">
            <p className={`text-amber-200 text-2xl`}>{tier}</p>
        </div>
    </div>
}