import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface HabitDayProps {
    date: Date
    defaultCompleted?: number
    amount?: number
}

export function HabitDay({ defaultCompleted = 0, amount = 0, date }: HabitDayProps) {

    const[completed, setCompleted] = useState(defaultCompleted)
    const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0
    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')

    function handleCompletedChange(completed: number) {
        setCompleted(completed)
    }
    return (
        <Popover.Root>
            <Popover.Trigger className={clsx('w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 focus:ring-offset-background', {
                'bg-cyan-500 border-emerald-400': completedPercentage >= 80,
                'bg-cyan-600 border-cyan-500': completedPercentage >= 60 && completedPercentage < 80,
                'bg-cyan-700 border-cyan-500': completedPercentage >= 40 && completedPercentage < 60,
                'bg-cyan-800 border-cyan-600': completedPercentage >= 20 && completedPercentage < 40,
                'bg-cyan-900 border-cyan-700': completedPercentage > 0 && completedPercentage < 20,
                'bg-neutral-900 border-neutral-800': completedPercentage === 0,
            })} />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-neutral-900 flex flex-col'>

                    <span className='font-semibold text-neutral-400'>{dayOfWeek}</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

                    <ProgressBar progress={completedPercentage} />

                    <HabitsList date={date} onCompletedChanged={handleCompletedChange}/>

                    <Popover.Arrow height={8} width={16} className='fill-cyan-500' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>

    )
}