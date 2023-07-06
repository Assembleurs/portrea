import React from 'react';
import Link from 'next/link';

const GoButton = ({ commune }) => (
  commune && (
    <Link href={`/diagnostic/${commune.code}`}>
      <a>Accéder au diagnostic pour {commune.nom}</a>
    </Link>
  )
);

export default GoButton;
