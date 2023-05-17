import { React } from 'react'

export const Article = () => {
    return (
        <div className='md:grid grid-cols-3 gap-1'>
            <div className='col-span-2 border-2'>1</div>
            <div className='row-span-2 border-2'>2</div>
            <div className='border-2'>3</div>
            <div className='border-2'>4</div>
        </div>
    );
};