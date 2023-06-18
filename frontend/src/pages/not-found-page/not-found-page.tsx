import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage() {
  return (
    <div className="user-page">
      <Logo />
      <div className="user-page__content" style={{textAlign: 'center'}}>
        <h1>404 not found</h1>
        <p>
          got to <Link to={AppRoute.Main}>main page</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
