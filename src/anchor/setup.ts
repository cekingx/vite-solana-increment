import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { Increment as IncrementType } from "./idl";
import Increment from "./idl.json";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
 
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
 
// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<IncrementType>(Increment as IncrementType, {
  connection,
});
 
export const accountAddress = new PublicKey("HiUcJRnHbRhxhjniQk5FZU7RSFKo6qrT3ZUF5XQaUUdx");
 
// This is just a TypeScript type for the Counter data structure based on the IDL
// We need this so TypeScript doesn't yell at us
export type CounterData = IdlAccounts<IncrementType>["increment"];