import LabelledSlider from "Components/Forms/LabelledSlider";
import React from "react";

interface RestrainedSlidersProps {
  values: Record<string, number>;
  lockedValues: string[];
  setValues: (usage: Record<string, number>) => void;
  setLockedValues: (types: string[]) => void;
}

const RestrainedSliders = ({
  values,
  lockedValues,
  setValues,
  setLockedValues,
}: RestrainedSlidersProps) => {
  // locked values do not change their usage when another value is changed

  const toggleValueLock = (type: string) => {
    if (lockedValues.includes(type))
      setLockedValues(lockedValues.filter((locked) => locked != type));
    else setLockedValues([...lockedValues, type]);
  };

  const allTypes = Object.keys(values);
  const changeUsage = (type: string, newVal: number) => {
    console.assert(newVal <= 1, "Error: " + newVal);
    const newValues = {
      ...values,
    };
    // the other (not locked) values types in ascending order of usage
    // it's important to sort in this way so that all other values decrease at the same rate
    const otherTypes = allTypes
      .filter((otherType) => otherType !== type)
      .filter((otherType) => !lockedValues.includes(otherType))
      .sort((a, b) => values[a] - values[b]);
    // To increase one value's usage, we need to decrease the other values so that all the usages sum to 1 (and v.v.)
    // change represents how much the other values need to decrease by
    let change = newVal - values[type];
    otherTypes.forEach((otherType, i) => {
      // We cannot bring a value's usage below 0
      const amountToChange = Math.min(
        // we will subtract the remaining amount of change, divided between the remaining
        change / (otherTypes.length - i),
        newValues[otherType]
      );
      newValues[otherType] -= amountToChange;
      change -= amountToChange;
    });
    //
    newValues[type] = newVal - change;

    // normalize to counter rounding errors
    const sum = allTypes.reduce((total, type) => total + values[type], 0);
    allTypes.forEach((type) => (newValues[type] /= sum));
    setValues(newValues);
    setValues(newValues);
  };
  return (
    <>
      {Object.keys(values).map((type) => (
        <LabelledSlider
          label={type}
          onChange={(value) => changeUsage(type, value / 100)}
          value={values[type] * 100}
          key={type}
          onRightClick={(e) => {
            e.preventDefault();
            toggleValueLock(type);
          }}
          color={
            lockedValues.includes(type) ? "#FC7769" : undefined
          }
        />
      ))}
    </>
  );
};

export default RestrainedSliders;
