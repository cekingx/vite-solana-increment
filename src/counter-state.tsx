import { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { program, accountAddress, CounterData } from "./anchor/setup";
 
export default function CounterState() {
  const { connection } = useConnection();
  const [counterData, setCounterData] = useState<CounterData | null>(null);
 
  useEffect(() => {
    // Fetch initial account data
    program.account.increment.fetch(accountAddress).then(data => {
      setCounterData(data);
    });
 
    // Subscribe to account change
    const subscriptionId = connection.onAccountChange(
      // The address of the account we want to watch
      accountAddress,
      // callback for when the account changes
      accountInfo => {
        setCounterData(
          program.coder.accounts.decode("increment", accountInfo.data),
        );
      },
    );
 
    return () => {
      // Unsubscribe from account change
      connection.removeAccountChangeListener(subscriptionId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program]);
 
  // Render the value of the counter
  return <p className="text-lg">Count: {counterData?.value?.toString()}</p>;
}