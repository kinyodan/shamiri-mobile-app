import React from 'react';
import {useQuery} from '@realm/react';
import {Profile} from '../../models';
import Journal from '../models/Journal';

export const Read = () => {
  // Find
  const profiles = useQuery(Profile);
  // Sort
  const sortedProfiles = useQuery(Profile, profiles => {
    return profiles.sorted('name', false);
  });
  // Filter
  const filteredProfiles = useQuery(Profile, profiles => {
    return profiles.filtered('name == "testProfile"');
  });

  // ... rest of component
};


export function LocalJournalList() {
  const Journal = useQuery(Journal);
}
  