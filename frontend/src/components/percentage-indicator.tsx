import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPercentage } from '@/lib/format';

interface PercentageIndicatorProps {
  value: number;
  changeDirection: 'up' | 'down';
  changeAmount: number;
  align?: 'left' | 'right';
}

export function PercentageIndicator({
  value,
  changeDirection,
  changeAmount,
  align = 'left',
}: PercentageIndicatorProps) {
  const isPositive = changeDirection === 'up';
  const Icon = isPositive ? ArrowUp : ArrowDown;

  return (
    <div className={cn('flex flex-col', align === 'right' ? 'items-end' : 'items-start')}>
      <span
        className={cn(
          'text-lg font-bold',
          isPositive ? 'text-positive' : 'text-negative',
        )}
      >
        {formatPercentage(value)}
      </span>
      <span
        className={cn(
          'flex items-center gap-0.5 text-xs font-medium',
          isPositive ? 'text-positive' : 'text-negative',
        )}
      >
        <Icon className="h-3 w-3" aria-hidden="true" />
        {formatPercentage(changeAmount)}
      </span>
    </div>
  );
}
