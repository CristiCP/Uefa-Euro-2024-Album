import loadingSvg from '../../Images/loading.svg';

function LoadingPack() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="p-8 rounded-xl">
              <img src={loadingSvg} className='w-48' alt="Loading..." />
            </div>
    </div>
  )
}

export default LoadingPack
