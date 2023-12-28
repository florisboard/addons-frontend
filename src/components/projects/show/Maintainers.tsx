import React from 'react';
import Avatar from 'react-avatar';
import Link from 'next/link';
import { IUser } from '@/interfaces';

type MaintainersProps = {
  maintainers: IUser[];
  user: IUser;
};

export default function Maintainers({ maintainers, user }: MaintainersProps) {
  const users = [user, ...maintainers];

  return (
    <section className="card bg-base-200 md:col-span-2">
      <div className="card-body">
        <h2 className="card-title font-display text-2xl">Maintainers</h2>
        <div className="divider" />
        <ul className="flex flex-wrap items-center gap-4">
          {users.map((user, i) => (
            <li key={user.id}>
              <Link
                className="flex flex-col items-center justify-center gap-2"
                href={`/users/${user.username}`}
              >
                <Avatar round size="40px" name={user.username} />
                <span className="block text-sm">
                  {user.username} {i === 0 && ' 👑'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
