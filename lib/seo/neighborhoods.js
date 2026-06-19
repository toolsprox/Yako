export const neighborhoods = [
  {
    slug: 'eastcote',
    name: 'Eastcote',
    postcode: 'HA5',
    distance: '1.5 miles'
  },
  {
    slug: 'rayners-lane',
    name: 'Rayners Lane',
    postcode: 'HA2',
    distance: '1.8 miles'
  },
  {
    slug: 'ruislip',
    name: 'Ruislip',
    postcode: 'HA4',
    distance: '2.5 miles'
  },
  {
    slug: 'hatch-end',
    name: 'Hatch End',
    postcode: 'HA5',
    distance: '1.2 miles'
  },
  {
    slug: 'south-harrow',
    name: 'South Harrow',
    postcode: 'HA2',
    distance: '3 miles'
  },
  {
    slug: 'northwood',
    name: 'Northwood',
    postcode: 'HA6',
    distance: '2.5 miles'
  }
];

export function getNeighborhoodBySlug(slug) {
  return neighborhoods.find(n => n.slug === slug);
}
