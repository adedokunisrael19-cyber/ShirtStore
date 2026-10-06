import { useState } from 'react'

function AnnouncementBar() {
    const [visible, setVisible] = useState(true)

    if(!visible) return null 

    return(
        <div className="flex items-center justify-center bg-black px-4 py-2 text-xs text-white sm:text-sm">
        <p>sign up and get 20% off your first order.
            <a href="#signup" className="ml-1 font-medium underline">
                Sign Up Now
            </a>
        </p>

        <button onClick={() => setVisible(false)} className="ml-auto" aria-label="Close announcement"> X </button>
        </div>
    )
    
}

export default AnnouncementBar