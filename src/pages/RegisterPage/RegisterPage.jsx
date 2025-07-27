import { useForm } from 'react-hook-form';
import css from './RegisterPage.module.css';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { BiErrorCircle } from 'react-icons/bi';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import clsx from 'clsx';
import { Link } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operations';
import toast from 'react-hot-toast';

function RegisterPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [passwordSuccess, setPasswordSuccess] = useState(true);
  const isTabletScreen = useMediaQuery({
    query: '(min-width: 767px max-width:1440)',
  });

  const dispatch = useDispatch();

  function handlePasswordVisible() {
    setIsPasswordVisible(prev => !prev);
  }

  const ValidationSchema = yup.object().shape({
    name: yup.string().min(3).required('Must be at least 3 characters'),
    email: yup
      .string()
      .email()
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      .required('Must be filled in'),
    password: yup
      .string()
      .matches(/^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/)
      .required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ValidationSchema) });

  const passwordValue = watch('password');

  useEffect(() => {
    if (
      passwordValue &&
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/.test(passwordValue)
    ) {
      setPasswordSuccess(true);
    } else {
      setPasswordSuccess(false);
    }
  }, [passwordValue, trigger]);

  function submitRegisterForm(data) {
    dispatch(
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Registration was successful');
      })
      .catch(() => {
        toast.error('Registration error user already exists');
      });

    reset();
  }
  return (
    <div className={clsx(css.mainRegisterContainer)}>
      <div className={clsx(css.logoDiv, 'container')}>
        <svg className={css.svg}>
          <use href="/sprite.svg#logo"></use>
        </svg>
        <p className={css.logoText}>VocabBuilder</p>
      </div>

      <div className={css.registerFormContainer}>
        <div className={css.imgDiv}>
          <picture>
            <source
              media="(min-width: 1440px)"
              srcSet="/img/illustration-PC.webp"
            />
            <img src="/img/illustration-mobile.webp" alt="Illustration" />
          </picture>
        </div>

        <div className={css.registerFormDiv}>
          <h1 className={css.formH1}>Register</h1>
          <p className={css.formText}>
            To start using our services, please fill out the registration form
            below. All fields are mandatory:
          </p>

          <form
            className={css.form}
            onSubmit={handleSubmit(submitRegisterForm)}
          >
            <div className={css.inputDiv}>
              <input
                className={css.input}
                type="text"
                placeholder="Name"
                {...register('name')}
              />
              {errors.name && (
                <span className={css.errorSpan}>
                  <BiErrorCircle color="red" />
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className={css.inputDiv}>
              <input
                className={css.input}
                type="text"
                placeholder="Email"
                {...register('email')}
              />
              {errors.email && (
                <span className={css.errorSpan}>
                  <BiErrorCircle color="red" />
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={css.inputPasswordDiv}>
              <input
                className={clsx(
                  css.inputPassword,
                  errors.password === undefined
                    ? null
                    : !errors.password
                    ? css.inputPasswordSuccess
                    : css.inputPasswordError
                )}
                type={isPasswordVisible ? 'password' : 'text'}
                placeholder="Password"
                {...register('password')}
              />

              {errors.password && (
                <span className={css.errorSpan}>
                  <BiErrorCircle color="red" />
                  Error password
                </span>
              )}

              {passwordSuccess && (
                <span className={css.successSpan}>
                  <BiErrorCircle color="green" />
                  Success password
                </span>
              )}

              <button
                className={css.isPasswordVisibleBtn}
                type="button"
                onClick={handlePasswordVisible}
              >
                {isPasswordVisible ? (
                  <svg className={css.svg}>
                    <use href="/sprite.svg#eye-off"></use>
                  </svg>
                ) : (
                  <svg className={css.svg}>
                    <use href="/sprite.svg#eye-on"></use>
                  </svg>
                )}
              </button>
            </div>

            <button className={css.submitBtn} type="submit">
              Register
            </button>
          </form>

          <Link className={css.linkLogin} to="/login">
            Login
          </Link>
        </div>
      </div>
      {isTabletScreen && (
        <p className={css.bottomP}>Word · Translation · Grammar · Progress</p>
      )}
    </div>
  );
}

export default RegisterPage;
