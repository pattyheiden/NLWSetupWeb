interface ProgressBarProps {
    progress: number
}

export function ProgressBar(props: ProgressBarProps) {
    const progressStyles = {
        width: `${props.progress}%`
    }
    return (
        <div className='h-3 rounded-xl bg-neutral-700 w-full mt-4'>
                        <div 
                            className='h-3 rounded-xl bg-cyan-600 transition-all'
                            style={progressStyles}
                            role="progressbar"
                            aria-label='Progresso de hábitos completados nesse dia.'
                            aria-aria-valuenow={props.progress}
                        />
                    </div>
    )
}