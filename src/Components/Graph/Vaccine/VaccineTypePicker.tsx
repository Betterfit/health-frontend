import LabelledSlider from "Components/Forms/LabelledSlider";
import vaccineJSON from "Data/vaccines.json";
import React, { useState } from "react";
import { Vaccine, VaccineType, VaccineUsage } from "Types";

const vaccines = vaccineJSON as Vaccine[];

interface VaccineTypePickerProps {
  setVaccineUsage: (usage: VaccineUsage) => void;
  vaccineUsage: VaccineUsage;
}

const VaccineTypePicker = ({
  vaccineUsage,
  setVaccineUsage,
}: VaccineTypePickerProps) => {
  // locked vaccines do not change their usage when another vaccine is changed
  const [lockedVaccines, setLockedVaccines] = useState<VaccineType[]>([]);

  const toggleVaccineLock = (type: VaccineType) => {
    if (lockedVaccines.includes(type))
      setLockedVaccines(lockedVaccines.filter((locked) => locked != type));
    else setLockedVaccines([...lockedVaccines, type]);
  };

  const allTypes = Object.keys(vaccineUsage) as VaccineType[];
  const changeUsage = (type: VaccineType, newVal: number) => {
    console.assert(newVal <= 1, "Error: " + newVal);
    const newVaccineUsage = {
      ...vaccineUsage,
    };
    // the other (not locked) vaccine types in ascending order of usage
    // it's important to sort in this way so that all other vaccines decrease at the same rate
    const otherTypes = allTypes
      .filter((otherType) => otherType !== type)
      .filter((otherType) => !lockedVaccines.includes(otherType))
      .sort((a, b) => vaccineUsage[a] - vaccineUsage[b]);
    // To increase one vaccine's usage, we need to decrease the other vaccines so that all the usages sum to 1 (and v.v.)
    // change represents how much the other vaccines need to decrease by
    let change = newVal - vaccineUsage[type];
    otherTypes.forEach((otherType, i) => {
      // We cannot bring a vaccine's usage below 0
      const amountToChange = Math.min(
        // we will subtract the remaining amount of change, divided between the remaining
        change / (otherTypes.length - i),
        newVaccineUsage[otherType]
      );
      newVaccineUsage[otherType] -= amountToChange;
      change -= amountToChange;
    });
    //
    newVaccineUsage[type] = newVal - change;

    // normalize to counter rounding errors
    const sum = allTypes.reduce((total, type) => total + vaccineUsage[type], 0);
    allTypes.forEach((type) => (newVaccineUsage[type] /= sum));
    setVaccineUsage(newVaccineUsage);
    setVaccineUsage(newVaccineUsage);
  };
  const efficacy = computeVaccineEfficacy(vaccineUsage);
  return (
    <>
      {Object.keys(vaccineUsage).map((type) => (
        <LabelledSlider
          label={type}
          onChange={(value) => changeUsage(type as VaccineType, value / 100)}
          value={vaccineUsage[type as VaccineType] * 100}
          key={type}
          onRightClick={(e) => {
            e.preventDefault();
            toggleVaccineLock(type as VaccineType);
          }}
          color={
            lockedVaccines.includes(type as VaccineType) ? "#FC7769" : undefined
          }
        />
      ))}
      <p className="text-white">Efficacy: {(efficacy * 100).toFixed(2)}%</p>
    </>
  );
};

/**
 * Returns the default vaccine usage, which maps vaccine types to their usage from 0 to 1.
 */
export const defaultVaccineUsage = (): VaccineUsage =>
  vaccines.reduce((vaccineUsage, vaccine) => {
    vaccineUsage[vaccine.type] = 1 / vaccines.length;
    return vaccineUsage;
  }, {} as VaccineUsage);

/**
 * Finds average vaccine efficacy weighted by the usage of each type.
 * @param vaccineUsage Maps vaccine type to efficacy
 * @returns The efficacy from 0 to 1
 */
export const computeVaccineEfficacy = (vaccineUsage: VaccineUsage): number => {
  const allTypes = Object.keys(vaccineUsage) as VaccineType[];
  return (
    allTypes.reduce(
      (weightedAvg, type) =>
        weightedAvg +
        vaccineUsage[type] *
          (vaccines.find((vaccine) => vaccine.type === type) as Vaccine)
            .efficacy,
      0
    ) / 100
  );
};

export default VaccineTypePicker;
