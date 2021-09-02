import { IIChooseDateState, IIChooseDateProps } from './i-choose-date.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import dayjs from 'dayjs';

export function useIChooseDateStore(props: IIChooseDateProps) {
  const { state, setStateWrap } = useStateStore(new IIChooseDateState());

  useEffect(() => {
    setStateWrap({
      value: (props.initValue && dayjs(props.initValue)).toDate() || new Date()
    });
  }, []);

  function onChange(event: Date) {
    setStateWrap({
      value: event
    });
  }

  function done() {
    props.onReturnResult(state.value);
  }
  return { state, onChange, done };
}
