export interface IPartyRef {
  'role': number;
  'docket': string;
  'party': string;
  'date_action': string | null;
}
export interface IAttorney {
  'resource_uri': string;
  'id': number;
  'parties_represented': IPartyRef[];
  'date_created': string;
  'date_modified': string;
  'name': string;
  'contact_raw': string;
  'phone': string;
  'fax': string;
  'email': string;
}
