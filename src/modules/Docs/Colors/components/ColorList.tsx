import ColorCard from '@/modules/Docs/Colors/components/ColorCard';

const colorGroups = [
  {
    name: 'Base',
    colors: [
      { name: 'base-100', className: 'bg-base-100', textColorClassName: 'text-base-content' },
      { name: 'base-200', className: 'bg-base-200', textColorClassName: 'text-base-content' },
      { name: 'base-300', className: 'bg-base-300', textColorClassName: 'text-base-content' },
      { name: 'base-content', className: 'bg-base-content', textColorClassName: 'text-base-100' }
    ]
  },
  {
    name: 'Brand',
    colors: [
      { name: 'primary', className: 'bg-primary', textColorClassName: 'text-primary-content' },
      { name: 'primary-content', className: 'bg-primary-content', textColorClassName: 'text-primary' },
      { name: 'secondary', className: 'bg-secondary', textColorClassName: 'text-secondary-content' },
      { name: 'secondary-content', className: 'bg-secondary-content', textColorClassName: 'text-secondary' },
      { name: 'accent', className: 'bg-accent', textColorClassName: 'text-accent-content' },
      { name: 'accent-content', className: 'bg-accent-content', textColorClassName: 'text-accent' }
    ]
  },
  {
    name: 'Neutral',
    colors: [
      { name: 'neutral', className: 'bg-neutral', textColorClassName: 'text-neutral-content' },
      { name: 'neutral-content', className: 'bg-neutral-content', textColorClassName: 'text-neutral' }
    ]
  },
  {
    name: 'Soft',
    colors: [
      { name: 'card', className: 'bg-card', textColorClassName: 'text-base-content' },
      { name: 'brand-soft', className: 'bg-brand-soft', textColorClassName: 'text-base-content' },
      { name: 'teal-soft', className: 'bg-teal-soft', textColorClassName: 'text-teal' },
      { name: 'rose-soft', className: 'bg-rose-soft', textColorClassName: 'text-rose' },
      { name: 'lilac-soft', className: 'bg-lilac-soft', textColorClassName: 'text-lilac' },
      { name: 'terminal', className: 'bg-terminal', textColorClassName: 'text-[#F3ECE2]' }
    ]
  },
  {
    name: 'State',
    colors: [
      { name: 'info', className: 'bg-info', textColorClassName: 'text-info-content' },
      { name: 'success', className: 'bg-success', textColorClassName: 'text-success-content' },
      { name: 'warning', className: 'bg-warning', textColorClassName: 'text-warning-content' },
      { name: 'error', className: 'bg-error', textColorClassName: 'text-error-content' }
    ]
  }
];

function ColorList() {
  return (
    <div className="space-y-8">
      {colorGroups.map(group => (
        <div key={group.name}>
          <h3 className="font-display text-xl font-bold tracking-tight text-base-content">{group.name}</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {group.colors.map(color => (
              <ColorCard key={color.name} {...color} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ColorList;
