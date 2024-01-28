import { useAvailableStationBikesContext } from "./AvailableStationBikes";

export default function TimeSelection() {
    const { interval, setInterval } = useAvailableStationBikesContext();

    const onChange = (type: keyof typeof interval) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setInterval((prev) => {
            if (!e.target.valueAsDate) return prev;

            return { ...prev, [type]: e.target.valueAsDate };
        });
    };

    return <div className='flex flex-col '>
        <h3 className='text-lg font-semibold'>Rent Duration</h3>
        <div className='flex flex-col gap-4 mt-2'>
            <div className='flex gap-2 justify-between items-center text-sm'>
                <label htmlFor='start'>Start</label>
                <input onChange={onChange('start')} defaultValue={interval.start.toISOString().split('.').at(0)} id='start' type='datetime-local' className='py-1.5 px-2 rounded-md focus:outline-none dark:bg-neutral-600/60' />
            </div>

            <div className='flex gap-2 justify-between items-center text-sm'>
                <label htmlFor='end'>End</label>
                <input onChange={onChange('end')} defaultValue={interval.end.toISOString().split('.').at(0)} id='end' type='datetime-local' className='py-1.5 px-2 rounded-md focus:outline-none dark:bg-neutral-600/60' />
            </div>
        </div>
    </div>;
}
