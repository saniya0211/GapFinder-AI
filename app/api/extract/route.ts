import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse";
export const runtime = "nodejs";
export async function POST(req:NextRequest){
 try{
  const form=await req.formData(); const file=form.get("file");
  if(!(file instanceof File)) return NextResponse.json({error:"No file uploaded."},{status:400});
  if(!file.name.toLowerCase().endsWith(".pdf")) return NextResponse.json({error:"Only PDF extraction is handled by this endpoint."},{status:400});
  if(file.size>10*1024*1024) return NextResponse.json({error:"PDF must be smaller than 10 MB."},{status:413});
  const buffer=Buffer.from(await file.arrayBuffer()); const parsed=await pdf(buffer);
  if(!parsed.text?.trim()) return NextResponse.json({error:"No selectable text found. Scanned PDFs need OCR."},{status:422});
  return NextResponse.json({text:parsed.text});
 }catch(e){return NextResponse.json({error:"PDF could not be parsed. Try a text-based PDF or upload TXT."},{status:500})}
}