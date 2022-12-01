import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast'

const MyProducts = () => {
    const { user } = useContext(AuthContext);

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myproducts?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    console.log('55555', users)

    // fetch(`http://localhost:5000/myproduct?email=${user?.email}`)

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleDeleteProduct = id => {
        fetch(`http://localhost:5000/myproduct/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
                toast.success('Delete successfully')
            })
    }

    return (
        <div>
            <h2 className='text-3xl'>My Products</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) =>
                                <tr key={user._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.image} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.productTitle}</td>
                                    <td>{user.reSellPrice}</td>

                                    <td> <button
                                        onClick={() => handleDeleteProduct(user._id)}
                                        className='btn btn-error btn-sm ml-3'>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;