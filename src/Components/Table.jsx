import React from 'react'

const table = ({ children, col, off, classLoad, classTable}) => {
  return (
    <div className='row mt-2'>
        <div className={'col-md-'+col+' offset-md-'+off}>
            <div className={'card border border-white text-center '+classLoad}>
                <div className='card-body'>
                    <img src="/loading.gif" className='img-fluid' />
                </div>
            </div>
            <div className={'table-responsive'+classTable}>
                {children}
            </div>
        </div>        
    </div>
  )
}

export default table