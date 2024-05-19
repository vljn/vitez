import DatePicker from '@/app/ui/admin/datePicker';
import { DateTime } from 'luxon';

export default function Page() {
  const date = new Date();
  return (
    <div>
      <DatePicker date={date} />
    </div>
  );
}
