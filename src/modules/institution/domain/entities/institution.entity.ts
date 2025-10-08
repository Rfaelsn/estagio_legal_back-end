import { v4 as uuid } from 'uuid';

export class InstitutionEntity {
  id: string;
  name: string;
  campus: string;
  cnpj: string;
  UF: string;
  city: string;
  district: string;
  address: string;
  telephone: string;
  postalCode: string;
  legalRepresentative: string;
  legalRepresentativeRole: string;

  constructor(props: Omit<InstitutionEntity, 'id'>, id?: string) {
    props = {
      ...props,
    };
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
