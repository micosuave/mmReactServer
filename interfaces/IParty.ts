export interface IAttorneyRef {
  'role': number;
  'docket': string;
  'attorney': string;
  'date_action': string | null;
}
export interface IPartyType {
  'docket': string;
  'name': string;
  'date_terminated': string | null;
  'extra_info': string;
  'highest_offense_level_opening': string;
  'highest_offense_level_terminated': string;
  'criminal_counts': any[];
  'criminal_complaints': any[];
}
export interface IParty {
  'resource_uri': string;
  'id': number;
  'attorneys': IAttorneyRef[];
  'party_types': IPartyType[];
  'date_created': string;
  'date_modified': string;
  'name': string;
  'extra_info': string;
  'title'?: string;
  'isChecked'?: boolean;
}
