<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	let { session } = $derived(data);

	const countries = {
		Afghanistan: 'AF',
		'Aland Islands': 'AX',
		Albania: 'AL',
		Algeria: 'DZ',
		'American Samoa': 'AS',
		Andorra: 'AD',
		Angola: 'AO',
		Anguilla: 'AI',
		Antarctica: 'AQ',
		'Antigua And Barbuda': 'AG',
		Argentina: 'AR',
		Armenia: 'AM',
		Aruba: 'AW',
		Australia: 'AU',
		Austria: 'AT',
		Azerbaijan: 'AZ',
		Bahamas: 'BS',
		Bahrain: 'BH',
		Bangladesh: 'BD',
		Barbados: 'BB',
		Belarus: 'BY',
		Belgium: 'BE',
		Belize: 'BZ',
		Benin: 'BJ',
		Bermuda: 'BM',
		Bhutan: 'BT',
		Bolivia: 'BO',
		'Bosnia And Herzegovina': 'BA',
		Botswana: 'BW',
		'Bouvet Island': 'BV',
		Brazil: 'BR',
		'British Indian Ocean Territory': 'IO',
		'Brunei Darussalam': 'BN',
		Bulgaria: 'BG',
		'Burkina Faso': 'BF',
		Burundi: 'BI',
		Cambodia: 'KH',
		Cameroon: 'CM',
		Canada: 'CA',
		'Cape Verde': 'CV',
		'Cayman Islands': 'KY',
		'Central African Republic': 'CF',
		Chad: 'TD',
		Chile: 'CL',
		China: 'CN',
		'Christmas Island': 'CX',
		'Cocos (Keeling) Islands': 'CC',
		Colombia: 'CO',
		Comoros: 'KM',
		Congo: 'CG',
		'Congo, Democratic Republic': 'CD',
		'Cook Islands': 'CK',
		'Costa Rica': 'CR',
		"Cote D'Ivoire": 'CI',
		Croatia: 'HR',
		Cuba: 'CU',
		Cyprus: 'CY',
		'Czech Republic': 'CZ',
		Denmark: 'DK',
		Djibouti: 'DJ',
		Dominica: 'DM',
		'Dominican Republic': 'DO',
		Ecuador: 'EC',
		Egypt: 'EG',
		'El Salvador': 'SV',
		'Equatorial Guinea': 'GQ',
		Eritrea: 'ER',
		Estonia: 'EE',
		Ethiopia: 'ET',
		'Falkland Islands (Malvinas)': 'FK',
		'Faroe Islands': 'FO',
		Fiji: 'FJ',
		Finland: 'FI',
		France: 'FR',
		'French Guiana': 'GF',
		'French Polynesia': 'PF',
		'French Southern Territories': 'TF',
		Gabon: 'GA',
		Gambia: 'GM',
		Georgia: 'GE',
		Germany: 'DE',
		Ghana: 'GH',
		Gibraltar: 'GI',
		Greece: 'GR',
		Greenland: 'GL',
		Grenada: 'GD',
		Guadeloupe: 'GP',
		Guam: 'GU',
		Guatemala: 'GT',
		Guernsey: 'GG',
		Guinea: 'GN',
		'Guinea-Bissau': 'GW',
		Guyana: 'GY',
		Haiti: 'HT',
		'Heard Island & Mcdonald Islands': 'HM',
		'Holy See (Vatican City State)': 'VA',
		Honduras: 'HN',
		'Hong Kong': 'HK',
		Hungary: 'HU',
		Iceland: 'IS',
		India: 'IN',
		Indonesia: 'ID',
		'Iran, Islamic Republic Of': 'IR',
		Iraq: 'IQ',
		Ireland: 'IE',
		'Isle Of Man': 'IM',
		Israel: 'IL',
		Italy: 'IT',
		Jamaica: 'JM',
		Japan: 'JP',
		Jersey: 'JE',
		Jordan: 'JO',
		Kazakhstan: 'KZ',
		Kenya: 'KE',
		Kiribati: 'KI',
		Korea: 'KR',
		Kuwait: 'KW',
		Kyrgyzstan: 'KG',
		"Lao People's Democratic Republic": 'LA',
		Latvia: 'LV',
		Lebanon: 'LB',
		Lesotho: 'LS',
		Liberia: 'LR',
		'Libyan Arab Jamahiriya': 'LY',
		Liechtenstein: 'LI',
		Lithuania: 'LT',
		Luxembourg: 'LU',
		Macao: 'MO',
		Macedonia: 'MK',
		Madagascar: 'MG',
		Malawi: 'MW',
		Malaysia: 'MY',
		Maldives: 'MV',
		Mali: 'ML',
		Malta: 'MT',
		'Marshall Islands': 'MH',
		Martinique: 'MQ',
		Mauritania: 'MR',
		Mauritius: 'MU',
		Mayotte: 'YT',
		Mexico: 'MX',
		'Micronesia, Federated States Of': 'FM',
		Moldova: 'MD',
		Monaco: 'MC',
		Mongolia: 'MN',
		Montenegro: 'ME',
		Montserrat: 'MS',
		Morocco: 'MA',
		Mozambique: 'MZ',
		Myanmar: 'MM',
		Namibia: 'NA',
		Nauru: 'NR',
		Nepal: 'NP',
		Netherlands: 'NL',
		'Netherlands Antilles': 'AN',
		'New Caledonia': 'NC',
		'New Zealand': 'NZ',
		Nicaragua: 'NI',
		Niger: 'NE',
		Nigeria: 'NG',
		Niue: 'NU',
		'Norfolk Island': 'NF',
		'Northern Mariana Islands': 'MP',
		Norway: 'NO',
		Oman: 'OM',
		Pakistan: 'PK',
		Palau: 'PW',
		'Palestinian Territory, Occupied': 'PS',
		Panama: 'PA',
		'Papua New Guinea': 'PG',
		Paraguay: 'PY',
		Peru: 'PE',
		Philippines: 'PH',
		Pitcairn: 'PN',
		Poland: 'PL',
		Portugal: 'PT',
		'Puerto Rico': 'PR',
		Qatar: 'QA',
		Reunion: 'RE',
		Romania: 'RO',
		'Russian Federation': 'RU',
		Rwanda: 'RW',
		'Saint Barthelemy': 'BL',
		'Saint Helena': 'SH',
		'Saint Kitts And Nevis': 'KN',
		'Saint Lucia': 'LC',
		'Saint Martin': 'MF',
		'Saint Pierre And Miquelon': 'PM',
		'Saint Vincent And Grenadines': 'VC',
		Samoa: 'WS',
		'San Marino': 'SM',
		'Sao Tome And Principe': 'ST',
		'Saudi Arabia': 'SA',
		Senegal: 'SN',
		Serbia: 'RS',
		Seychelles: 'SC',
		'Sierra Leone': 'SL',
		Singapore: 'SG',
		Slovakia: 'SK',
		Slovenia: 'SI',
		'Solomon Islands': 'SB',
		Somalia: 'SO',
		'South Africa': 'ZA',
		'South Georgia And Sandwich Isl.': 'GS',
		Spain: 'ES',
		'Sri Lanka': 'LK',
		Sudan: 'SD',
		Suriname: 'SR',
		'Svalbard And Jan Mayen': 'SJ',
		Swaziland: 'SZ',
		Sweden: 'SE',
		Switzerland: 'CH',
		'Syrian Arab Republic': 'SY',
		Taiwan: 'TW',
		Tajikistan: 'TJ',
		Tanzania: 'TZ',
		Thailand: 'TH',
		'Timor-Leste': 'TL',
		Togo: 'TG',
		Tokelau: 'TK',
		Tonga: 'TO',
		'Trinidad And Tobago': 'TT',
		Tunisia: 'TN',
		Turkey: 'TR',
		Turkmenistan: 'TM',
		'Turks And Caicos Islands': 'TC',
		Tuvalu: 'TV',
		Uganda: 'UG',
		Ukraine: 'UA',
		'United Arab Emirates': 'AE',
		'United Kingdom': 'GB',
		'United States': 'US',
		'United States Outlying Islands': 'UM',
		Uruguay: 'UY',
		Uzbekistan: 'UZ',
		Vanuatu: 'VU',
		Venezuela: 'VE',
		'Viet Nam': 'VN',
		'Virgin Islands, British': 'VG',
		'Virgin Islands, U.S.': 'VI',
		'Wallis And Futuna': 'WF',
		'Western Sahara': 'EH',
		Yemen: 'YE',
		Zambia: 'ZM',
		Zimbabwe: 'ZW',
		'North Macedonia': 'MK',
		Češka: 'CZ'
	};
</script>

<svelte:head>
    <title>claim your free card ✦ nighteden</title>
</svelte:head>

<a class="back-button" href="/">
	<svg viewBox="0 0 20 20" class="Icon_Icon__uZZKy" style="width: 20px; height: 20px;"
		><path
			fill-rule="evenodd"
			d="M11.764 5.204a.75.75 0 0 1 .032 1.06l-3.516 3.736 3.516 3.736a.75.75 0 1 1-1.092 1.028l-4-4.25a.75.75 0 0 1 0-1.028l4-4.25a.75.75 0 0 1 1.06-.032Z"
		></path></svg
	>
	Back
</a>

<div class="stack">
	<h1>Claim your free holiday card</h1>

	<p>
		To claim your free holiday card, I need to send your card to a physical address. Fill the form
		below to process your order.
	</p>

	<div class="stack stack--small">

		<h2>Shipping address</h2>

		<form class="stack" method="POST">
			<div class="field">
				<label for="card_name">Name on Card (To:)</label>
				<input
					type="text"
					id="card_name"
					name="card_name"
					value={session?.user.user_metadata.full_name}
				/>
			</div>
			<div class="field-group">
				<div class="field">
					<label for="first_name">First name</label>
					<input type="text" id="first_name" name="first_name" required />
				</div>
				<div class="field">
					<label for="last_name">Last name</label>
					<input type="text" id="last_name" name="last_name" required />
				</div>
			</div>
			<div class="field">
				<label for="suite">Apartment/Suite No. (Optional)</label>
				<input type="text" id="suite" name="suite" />
			</div>
			<div class="field">
				<label for="address">Address</label>
				<input type="text" id="address" name="address" required />
			</div>
			<div class="field">
				<label for="address2">Address 2 (Optional)</label>
				<input type="text" id="address2" name="address2" />
			</div>
			<div class="field">
				<label for="city">City</label>
				<input type="text" id="city" name="city" required />
			</div>
			<div class="field">
				<label for="province">Province / State</label>
				<input type="text" id="province" name="province" required />
			</div>
			<div class="field">
				<label for="zip">ZIP / Post Code</label>
				<input type="text" id="zip" name="zip" required />
			</div>
			<div class="field">
				<label for="country">Country</label>
				<div class="select-container">
					<select
						class="select-container__select"
						id="country"
						name="country"
						value="United Kingdom"
						required
					>
						{#each Object.keys(countries) as country}
							<option>{country}</option>
						{/each}
					</select>
					<svg viewBox="0 0 20 20" class="select-container__icon" style="width: 20px; height: 20px;"
						><path
							d="M10.884 4.323a1.25 1.25 0 0 0-1.768 0l-2.646 2.647a.75.75 0 0 0 1.06 1.06l2.47-2.47 2.47 2.47a.75.75 0 1 0 1.06-1.06l-2.646-2.647Z"
						></path><path
							d="m13.53 13.03-2.646 2.647a1.25 1.25 0 0 1-1.768 0l-2.646-2.647a.75.75 0 0 1 1.06-1.06l2.47 2.47 2.47-2.47a.75.75 0 0 1 1.06 1.06Z"
						></path></svg
					>
				</div>
			</div>
			<button class="button button--primary" type="submit">Claim free card</button>
		</form>

	</div>
</div>

<style lang="scss">
	.back-button {
		display: inline-flex;
		text-decoration: none;
		align-items: center;
		font-weight: 600;
		svg {
			position: relative;
			top: -1px;
		}
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	label {
		font-weight: 550;
	}
	@media screen and (min-width: 480px) {
		.field-group {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 24px;
		}
	}
</style>
