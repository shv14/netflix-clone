import React from 'react';
interface MobileMenuProps {
    visible?: boolean
}
const MobileMenu: React.FC<MobileMenuProps> = ({
    visible
}) => {
    if (!visible) {
        return null;
    }
    return (
        <div className='bg-black top-8 absolute w-56 left-8 py-5 flex flex-col border-2 border-gray-800'>
            <div className='flex flex-col gap-4'>
                <div className='text-center text-white hover:underline px-3'>
                    Home
                </div>
                <div className='text-center text-white hover:underline px-3'>
                    Series
                </div>
                <div className='text-center text-white hover:underline px-3'>
                    Films
                </div>
                <div className='text-center text-white hover:underline px-3'>
                    My List
                </div>
                <div className='text-center text-white hover:underline px-3'>
                    New & Popular
                </div>
                <div className='text-center text-white hover:underline px-3'>
                    Browse by Language
                </div>
            </div>
        </div>
    );
}

export default MobileMenu
