export interface Customer {
  id: string;
  externalId: string;
  userName: string;
  name: {
    formatted: string;
    familyName: string;
    givenName: string;
    middleName?: string;
    honorificPrefix?: string;
    honorificSuffix?: string;
  };
  displayName: string;
  nickName?: string;
  profileUrl: string;
  emails: Email[];
  addresses: Address[];
  phoneNumbers: PhoneNumber[];
  ims: IM[];
  photos: Photo[];
  userType: string;
  title: string;
  preferredLanguage: string;
  locale: string;
  timezone: string;
  active: boolean;
  password: string;
  groups: {
    value: string;
    href: string;
    display: string;
  };
  dateCreated: string; // ISO 8601 date string
  dateModified: string; // ISO 8601 date string
  membership: Membership;
  hostExtraInfo: AdditionalInfo[];
}

interface Email {
  type: string;
  value: string;
  primary: boolean;
}

interface Address {
  type: string;
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: number;
  country: string;
  formatted: string;
  primary: boolean;
}

interface PhoneNumber {
  value: string;
  type: string;
  primary: boolean;
}

interface IM {
  value: string;
  type: string;
  primary: boolean;
}

interface Photo {
  value: string;
  type: string;
}

interface MembershipExpiryDate {
  month: string; // Zero-padded month string (e.g., "09")
  year: string; // Year string (e.g., "20")
  singleValue?: string;
}

interface Membership {
  membershipType?: string;
  membershipId?: string;
  membershipProgramId?: string;
  membershipStatus?: string;
  membershipExpiryDate?: MembershipExpiryDate;
  accountNumber?: string;
  securityCode?: string;
  merchantId?: string;
  altMerchantId?: string;
  verifyAccount?: boolean;
  additionalInfo?: AdditionalInfo[];
}

interface AdditionalInfo {
  name: string;
  value: string;
  valueAsList: string[];
}

interface DeviceInfo {
  id: string;
  kind: string;
  details: DeviceDetail[];
  additionalInfo: AdditionalInfo[];
}

interface DeviceDetail {
  provider: string;
  dataCapture: {
    rawData: string;
    dataEventId: string;
    captureTime: string; // ISO 8601 date string
  };
  dataStatic: {
    os: string;
    osVersion: string;
    model: string;
    type: string;
  };
  dataDynamic: {
    latitude?: string;
    longitude?: string;
    ipAddress: string;
    captureTime: string; // ISO 8601 date string
  };
  dataApplication: {
    version: string;
    name: string;
    country: string;
  };
}

export interface RootObject {
  customer: Customer;
  deviceInfo: DeviceInfo;
}
