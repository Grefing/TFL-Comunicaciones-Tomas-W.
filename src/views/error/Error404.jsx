import { Link } from 'react-router-dom';
import './error404.css'

const Eror404 = () => {
    return (
        <section className="mainSection d-flex flex-column justify-content-center">
            <div className='align-self-center mt-4'>
                <img src='/src/assets/error404.png' alt="imgError" className='imgError' />
            </div>

            <div className='align-self-center my-5'>
                <Link to={'/'} className='goBackBtn'> Volver al inicio </Link>    
            </div>    
        </section>
    );
};

export default Eror404;