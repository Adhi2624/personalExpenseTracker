import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/models/category";
import { NextRequest } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const category = new Category(data);
    console.log("Category data:", category);
    await category.save();
    return NextResponse.json({ message: "Category created successfully", category }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error creating category" }, { status: 500 });
  }
}


export async function GET(request) {
  try {
    await dbConnect();
    const categories = await Category.find().lean(); // Assuming Category is a mongoose model
    return NextResponse.json({ categories }, { status: 200 });
  }
  catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
  }
}
