'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Actions from '@/components/domains/Actions';
import useDomains from '@/services/domains';

export default function DomainsList() {
  const { data } = useDomains();

  return (
    <div className="overflow-x-auto rounded-box border">
      <table className="table table-lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Domain</th>
            <th>Verification Text</th>
            <th>Verified At</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((domain, i) => {
            return (
              <tr key={domain.id}>
                <th>{i + 1}</th>
                <td>{domain.name}</td>
                <td className="select-all">{domain.verification_text}</td>
                <td>
                  {domain.verified_at &&
                    formatDistanceToNow(new Date(domain.verified_at), { addSuffix: true })}
                </td>
                <Actions domain={domain} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
