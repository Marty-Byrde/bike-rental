import Image from 'next/image'
import Review from "@/app/(components)/review/Review";

export default function Home() {
  return (
    <div className="">
      <h1>This is some content...</h1>
        <Review/>
    </div>
  )
}
