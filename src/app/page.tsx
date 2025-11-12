'use server'
import React from 'react'
import Dashboard from '@/components/pages/Dashboard'
import { validateUser } from '@/lib/validateUser';

type Props = {}

const Home = async (props: Props) => {
  const user = await validateUser();

  return (
    <div>
      <Dashboard user={user} />
    </div>
  );
};

export default Home;

