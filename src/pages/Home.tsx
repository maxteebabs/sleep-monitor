import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="container mx-auto">
            <div className="columns-1 py-5">
                <h3 className="text-3xl">Welcome</h3>
                <span className="text-xs">Click on the regsitration link below</span>


                <nav>
                    <ul className="list-disc hover:list-inside">
                        <li>
                            <Link className='hover:underline' to="/register">Register</Link>
                        </li>
                        <li>
                            <Link className='hover:underline' to="/preview">Preview</Link>
                        </li>
                    </ul>
                </nav>
            </div>

        </div >

    )
}