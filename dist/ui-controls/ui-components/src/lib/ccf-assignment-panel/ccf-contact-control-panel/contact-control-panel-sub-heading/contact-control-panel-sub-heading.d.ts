export interface ContactControlPanelSubHeadingProps {
    subHeading2?: string;
    subHeading3?: string;
}
/**
 * Component display sub heading for contact control panel
 * @param props -ContactControlPanelSubHeadingProps
 * ```
 * @example -
 * const subHeading1 = "253-895-8956"
 * const subHeading2 = "#439-Z3FM-5S23"
 * const subHeading3 = "Cust. Service Request"
 * <ContactControlPanelSubHeading subHeading1={props.subHeading1} subHeading2={props.subHeading2} subHeading3={props.contact.queueName} />
 * ```
 */
export declare function ContactControlPanelSubHeading(props: ContactControlPanelSubHeadingProps): JSX.Element;
export default ContactControlPanelSubHeading;
