export default function AddressInputs({addressProps, setAddressProp, disabled=false}) {
    const {phone, address, postalCode, city, state, country} = addressProps;
    
    return (
        <>
        <label>Phone number</label>
                <input disabled={disabled} required type="tel" placeholder="Phone number" value={phone || ''} onChange={ev => setAddressProp('phone', ev.target.value)} />
                <label>Street</label>
                <input disabled={disabled} required type="text" placeholder="Street" value={address || ''} onChange={ev => setAddressProp('address', ev.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label>Postal code</label>
                        <input disabled={disabled} required type="text" placeholder="Postal code" value={postalCode || ''} onChange={ev => setAddressProp('postalCode', ev.target.value)} />
                    </div>
                    <div>
                        <label>City</label>
                        <input disabled={disabled} required type="text" placeholder="City" value={city || ''} onChange={ev => setAddressProp('city', ev.target.value)} />
                    </div>
                </div>
                <label>State</label>
                <input disabled={disabled} required type="text" placeholder="State" value={state || ''} onChange={ev => setAddressProp('state', ev.target.value)} />
                <label>Country</label>
                <input disabled={disabled} required type="text" placeholder="Country" value={country || ''} onChange={ev => setAddressProp('country', ev.target.value)} />
        </>
    );
}