import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Expense from "@/models/Expense";

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    // Force Type to "Expense" for all new transactions
    const transactionData = {
      ...data,
      Type: "Expense"
    };
    const expense = new Expense(transactionData);
    await expense.save();
    return NextResponse.json({ message: "Transaction created successfully", expense }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error creating transaction" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const expenses = await Expense.find().sort({ Date: -1 }).lean();
    return NextResponse.json({ expenses }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error fetching transactions" }, { status: 500 });
  }
}
