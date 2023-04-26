import { Navigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import RegisterForm from '../../components/register-form/register-form';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';
import { getIsAuth } from '../../store/user-data/selectors';
import { AppRoute } from '../../const';

function RegisterPage() {
  const isAuth = useAppSelector(getIsAuth);

  if (isAuth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign up</h1>
      </header>

      <div className="sign-in user-page__content">
        <RegisterForm />
      </div>

      <Footer />
    </div>
  );
}

export default RegisterPage;
