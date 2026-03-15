// Parish Icons Mapping - Diocese of Tagum
// Maps parish names to their icon URLs (full background images with text baked in)

const VIBECODE_IMAGES_BASE = 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images';

// Icon URL mapping - maps parish name keywords (lowercase) to full icon URL
export const parishIconUrls: Record<string, string> = {
  // Updated batch - 15 icons with text baked in
  'birhen sa kasilak': `${VIBECODE_IMAGES_BASE}/birhen_sa_kasilak_madaum_1770964794078_019c55ba-3ade-729c-b469-6404824655a7.png`,
  'christ the king cathedral': `${VIBECODE_IMAGES_BASE}/christ_the_king_cathedral_1770964795958_019c55ba-4236-741e-9c16-475347ff8c4c.png`,
  'parish of christ the eucharistic king': `${VIBECODE_IMAGES_BASE}/parish_of_christ_the_eucharist_1770964796789_019c55ba-4575-76cb-b97b-2b95f4f14cb0.png`,
  'sacred heart of jesus': `${VIBECODE_IMAGES_BASE}/sacred_heart_of_jesus_1770964796609_019c55ba-44c1-75aa-bd9a-d75e457fdf9f.png`,
  'sagrado corazon de jesus nazareno': `${VIBECODE_IMAGES_BASE}/sagrado_corazon_de_jesus_nazar_1770964796752_019c55ba-4550-71e0-b600-8c18a8de77f2.png`,
  'birhen sa sto. rosario': `${VIBECODE_IMAGES_BASE}/birhen_sa_sto_rosario_mapawa_1770964795967_019c55ba-423f-709a-8e8c-3c95c31edb1a.png`,
  'san isidro labrador camanlangan': `${VIBECODE_IMAGES_BASE}/san_isidro_labrador_camanlanga_1770964796788_019c55ba-4574-764a-9047-8d00953cd817.png`,
  'san vicente ferrer maragusan': `${VIBECODE_IMAGES_BASE}/san_vicente_ferrer_maragusan_1770964796557_019c55ba-448d-740e-812b-baa57b4da24f.png`,
  'our lady of mother perpetual help': `${VIBECODE_IMAGES_BASE}/our_mother_of_perpetual_help_m_1770964795529_019c55ba-4089-751e-ab24-9f1beb8479b8.png`,
  'diocesan shrine of our lady of mother perpetual help': `${VIBECODE_IMAGES_BASE}/our_mother_of_perpetual_help_m_1770964795529_019c55ba-4089-751e-ab24-9f1beb8479b8.png`,
  'mary mediatrix of all grace pagakpak': `${VIBECODE_IMAGES_BASE}/mary_mediatrix_of_all_grace_qu_1770964795754_019c55ba-416a-710a-a0a1-122a3c1a9c1d.png`,
  'san antonio de padua fuentes': `${VIBECODE_IMAGES_BASE}/san_antonio_de_padua_fuentes_p_1770964796541_019c55ba-447d-7154-b82e-ca45bcc1f8ba.png`,
  'san jose pantukan': `${VIBECODE_IMAGES_BASE}/san_jose_pantukan_1770964796606_019c55ba-44be-760d-855d-9122b30b8d05.png`,
  'sto. niño mabini': `${VIBECODE_IMAGES_BASE}/sto_ni__o_mabini_1770964796598_019c55ba-44b6-71de-89fc-06b87df9c345.png`,
  'holy family laak': `${VIBECODE_IMAGES_BASE}/holy_family_laak_1770964796784_019c55ba-4570-75ca-911b-d82315e8d50e.png`,
  'san agustin kapatagan': `${VIBECODE_IMAGES_BASE}/san_agustin_quasi_kapatagan_1770964796391_019c55ba-43e7-7713-8136-97dbf1dee026.png`,
};

// Helper function to get parish icon URL by parish name and location
export function getParishIconUrl(parishName: string, location?: string): string | undefined {
  const lowerName = parishName.toLowerCase();
  const lowerLocation = location?.toLowerCase() || '';

  // Try exact match with name + location combined
  for (const [key, url] of Object.entries(parishIconUrls)) {
    if (lowerName.includes(key) || (lowerName + ' ' + lowerLocation).includes(key)) {
      return url;
    }
  }

  // Try matching specific patterns
  if (lowerName.includes('birhen sa kasilak') && lowerLocation.includes('madaum')) {
    return parishIconUrls['birhen sa kasilak'];
  }
  if (lowerName.includes('christ the king cathedral')) {
    return parishIconUrls['christ the king cathedral'];
  }
  if (lowerName.includes('christ the eucharistic king')) {
    return parishIconUrls['parish of christ the eucharistic king'];
  }
  if (lowerName.includes('sacred heart of jesus') && !lowerName.includes('sagrado')) {
    return parishIconUrls['sacred heart of jesus'];
  }
  if (lowerName.includes('sagrado corazon')) {
    return parishIconUrls['sagrado corazon de jesus nazareno'];
  }
  if (lowerName.includes('birhen sa sto') && lowerLocation.includes('mapawa')) {
    return parishIconUrls['birhen sa sto. rosario'];
  }
  if (lowerName.includes('san isidro labrador') && lowerLocation.includes('camanlangan')) {
    return parishIconUrls['san isidro labrador camanlangan'];
  }
  if (lowerName.includes('san vicente ferrer') && lowerLocation.includes('maragusan')) {
    return parishIconUrls['san vicente ferrer maragusan'];
  }
  if (lowerName.includes('perpetual help') && lowerLocation.includes('maco')) {
    return parishIconUrls['our lady of mother perpetual help'];
  }
  if (lowerName.includes('mary mediatrix') && lowerLocation.includes('pagakpak')) {
    return parishIconUrls['mary mediatrix of all grace pagakpak'];
  }
  if (lowerName.includes('san antonio de padua') && lowerLocation.includes('fuentes')) {
    return parishIconUrls['san antonio de padua fuentes'];
  }
  if (lowerName.includes('san jose') && lowerLocation.includes('pantukan')) {
    return parishIconUrls['san jose pantukan'];
  }
  if (lowerName.includes('sto. niño') && lowerLocation.includes('mabini')) {
    return parishIconUrls['sto. niño mabini'];
  }
  if (lowerName.includes('holy family') && lowerLocation.includes('laak')) {
    return parishIconUrls['holy family laak'];
  }
  if (lowerName.includes('san agustin') && lowerLocation.includes('kapatagan')) {
    return parishIconUrls['san agustin kapatagan'];
  }

  return undefined;
}

// Check if a parish has an icon
export function hasParishIcon(parishName: string, location?: string): boolean {
  return getParishIconUrl(parishName, location) !== undefined;
}
