
import ShortenItem from "./ShortenItem";


function ShorternUrlList({data}) {
  return (
    <div className='my-6 space-y-4'>
        {
            data.map((item) => (
                <div key={item.id} className='p-4 bg-gray-100 rounded-lg shadow-md'>
                    <ShortenItem key={item.id} {...item} />
                </div>
            ))
        }
    </div>
  )
}
export default ShorternUrlList
