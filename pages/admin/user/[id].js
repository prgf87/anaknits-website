import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { getError } from '../../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    default:
      return state;
  }
}
export default function AdminUserEditScreen() {
  const { query } = useRouter();
  const userId = query.id;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/users/${userId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.name);
        setValue('email', data.email);
        setValue('password', data.password);
        setValue('isAdmin', data.isAdmin);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [userId, setValue]);

  const router = useRouter();

  const submitHandler = async ({ name, email, password, isAdmin }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/users/${userId}`, {
        name,
        email,
        password,
        isAdmin,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('User updated successfully');
      router.push('/admin/users');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit User ${userId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link href="/admin/products">Products</Link>
            </li>
            <li>
              <Link href="/admin/users">
                <a className="font-bold">Users</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          {loading ? (
            <div>Loading content...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-xl">{`Edit User ${userId}`}</h1>
              <div className="mb-4">
                <label htmlFor="name">User Name</label>
                <input
                  type="text"
                  className="w-full"
                  id="name"
                  autoFocus
                  {...register('name', {
                    required: 'Please enter user name',
                  })}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Please enter user email address',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: 'Please enter a valid user email address!',
                    },
                  })}
                  className="w-full"
                  id="email"
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>
              {/* <div className="mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  {...register('password', {
                    minLength: {
                      value: 8,
                      message: 'Password must be 8 characters or more',
                    },
                  })}
                  className="w-full"
                  id="password"
                ></input>
                {errors.password && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword">Confirm your Password</label>
                <input
                  type="password"
                  className="w-full"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    validate: () => `${password}` === `${confirmPassword}`,
                    minLength: {
                      value: 8,
                      message:
                        'Password must match your password and be 8 characters or more.',
                    },
                  })}
                /> */}
              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  {...register('password', {
                    required: 'Please enter your password',
                    minLength: {
                      value: 8,
                      message: 'Password must be 8 characters or more',
                    },
                  })}
                  className="w-full"
                  id="password"
                  autoFocus
                ></input>
                {errors.password && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword">Confirm your Password</label>
                <input
                  type="password"
                  className="w-full"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required:
                      'Please confirm your password, make sure they are the same',
                    validate: (value) => value === getValues('password'),
                    minLength: {
                      value: 8,
                      message:
                        'Password must match your password and be 8 characters or more.',
                    },
                  })}
                />
              </div>
              {/* 
              {errors.confirmPassword && (
                <div className="text-red-500">{errors.password.message}</div>
              )} */}
              {errors.confirmPassword &&
                errors.confirmPassword.type === 'validate' && (
                  <div className="text-red-500">Passwords do not match!</div>
                )}
              <div className="mb-4">
                <label htmlFor="isAdmin">Administrator</label>
                <br></br>
                <input
                  type="checkbox"
                  id="isAdmin"
                  {...register('isAdmin', { value: true })}
                />
                <label htmlFor="isAdminTrue">True</label>
                &nbsp;
                {/* <input
                  type="radio"
                  id="isAdminFalse"
                  className="p-5"
                  {...register('isAdmin', { value: false })}
                />
                <label for="isAdminFalse">False</label> */}
              </div>
              <div className="mb-4">
                <button disabled={loadingUpdate} className="primary-button">
                  {loadingUpdate ? 'Loading' : 'Update'}
                </button>
              </div>
              <div className="mb-4">
                <Link href={`/admin/users`}>
                  <button className="secondary-button">Back</button>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminUserEditScreen.auth = { adminOnly: true };
