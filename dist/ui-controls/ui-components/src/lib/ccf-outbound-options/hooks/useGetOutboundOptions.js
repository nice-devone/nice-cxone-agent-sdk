// noinspection ES6PreferShortImport
import { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { phoneOBSkillsSelector, isOutboundSkillSelector, digitalOBSkillsSelector } from '../../ccf-agent-skill/ccf-agent-skill-details-slice';
import { ObChannelListSelector, userHaveObChannelSelector } from '../../ccf-assignment-panel/ccf-contact-assignment/ccf-channel-details-slice';
import { OBChannels } from '../ccf-outbound-options';
/**
 * Filter OB channels by channel type
 * @example
 * ```
 * filterByChannelType(OBChannels.EMAIL)
 * ```
 */
export const filterByChannelType = (channelType) => (channel) => { var _a; return ((_a = channel.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === (channelType === null || channelType === void 0 ? void 0 : channelType.toLowerCase()); };
/**
 * Filter digital OB skills by channel type
 * @example
 * ```
 * filterSkillByChannelType(OBChannels.EMAIL)
 * ```
 */
export const filterSkillByChannelType = (channelType) => (skill) => { var _a; return ((_a = skill.digitalPOC) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === (channelType === null || channelType === void 0 ? void 0 : channelType.toLowerCase()); };
/**
 * Filter OB channels by channel id
 * @example
 * ```
 * filterByChannelType('channelId')
 * ```
 */
export const filterByChannelId = (channelId) => (channel) => { var _a; return ((_a = channel.id) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === (channelId === null || channelId === void 0 ? void 0 : channelId.toLowerCase()); };
/**
 * Unified hook that returns the Phone and Digital skills
 * Returns:
 * - All phone skills
 * - All Outbound Digital Channels
 * - Filtered Email, SMS and Whatsapp Channels
 * - Flag that indicates if the user have skills/channles assigned
 * - Number of skills/channels per channel type for easy cheaking if current user has 1 or more
 * @example
 * ```
 * const outboundOptions = useGetOutboundOptions()
 * ```
 */
export default function useGetOutboundOptions() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const phoneOBSkills = useSelector(phoneOBSkillsSelector, shallowEqual);
    const outboundChannels = useSelector(ObChannelListSelector, shallowEqual);
    const isOutboundSkillAssigned = useSelector(isOutboundSkillSelector);
    const userHaveObChannel = useSelector(userHaveObChannelSelector);
    const { emailChannels: emailOBChannels, smsChannels: smsOBChannels, whatsappChannels: whatsappOBChannels } = useMemo(() => {
        var _a, _b, _c;
        return ({
            emailChannels: (_a = outboundChannels === null || outboundChannels === void 0 ? void 0 : outboundChannels.filter(filterByChannelType(OBChannels.EMAIL))) !== null && _a !== void 0 ? _a : [],
            smsChannels: (_b = outboundChannels === null || outboundChannels === void 0 ? void 0 : outboundChannels.filter(filterByChannelType(OBChannels.SMS))) !== null && _b !== void 0 ? _b : [],
            whatsappChannels: (_c = outboundChannels === null || outboundChannels === void 0 ? void 0 : outboundChannels.filter(filterByChannelType(OBChannels.WHATSAPP))) !== null && _c !== void 0 ? _c : [],
        });
    }, [outboundChannels]);
    const emailOBChannelsLength = (_a = emailOBChannels === null || emailOBChannels === void 0 ? void 0 : emailOBChannels.length) !== null && _a !== void 0 ? _a : 0;
    const outboundChannelsLength = (_b = outboundChannels === null || outboundChannels === void 0 ? void 0 : outboundChannels.length) !== null && _b !== void 0 ? _b : 0;
    const phoneOBSkillsLength = (_c = phoneOBSkills === null || phoneOBSkills === void 0 ? void 0 : phoneOBSkills.length) !== null && _c !== void 0 ? _c : 0;
    const smsOBChannelsLength = (_d = smsOBChannels === null || smsOBChannels === void 0 ? void 0 : smsOBChannels.length) !== null && _d !== void 0 ? _d : 0;
    const whatsappOBChannelsLength = (_e = whatsappOBChannels === null || whatsappOBChannels === void 0 ? void 0 : whatsappOBChannels.length) !== null && _e !== void 0 ? _e : 0;
    const digitalOBSkills = useSelector(digitalOBSkillsSelector, shallowEqual);
    const { emailOBSkills, smsOBSkills, whatsappOBSkills } = useMemo(() => {
        var _a, _b, _c;
        // Create Sets for O(1) lookup instead of O(n) array.some()
        const emailChannelIds = new Set(emailOBChannels.map(channel => channel === null || channel === void 0 ? void 0 : channel.id));
        const smsChannelIds = new Set(smsOBChannels.map(channel => channel === null || channel === void 0 ? void 0 : channel.id));
        const whatsappChannelIds = new Set(whatsappOBChannels.map(channel => channel === null || channel === void 0 ? void 0 : channel.id));
        return {
            emailOBSkills: (_a = digitalOBSkills === null || digitalOBSkills === void 0 ? void 0 : digitalOBSkills.filter(skill => {
                var _a;
                return ((_a = skill.digitalPOC) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === OBChannels.EMAIL.toLowerCase() &&
                    emailChannelIds.has(skill === null || skill === void 0 ? void 0 : skill.digitalPOCName);
            })) !== null && _a !== void 0 ? _a : [],
            smsOBSkills: (_b = digitalOBSkills === null || digitalOBSkills === void 0 ? void 0 : digitalOBSkills.filter(skill => {
                var _a;
                return ((_a = skill.digitalPOC) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === OBChannels.SMS.toLowerCase() &&
                    smsChannelIds.has(skill === null || skill === void 0 ? void 0 : skill.digitalPOCName);
            })) !== null && _b !== void 0 ? _b : [],
            whatsappOBSkills: (_c = digitalOBSkills === null || digitalOBSkills === void 0 ? void 0 : digitalOBSkills.filter(skill => {
                var _a;
                return ((_a = skill.digitalPOC) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === OBChannels.WHATSAPP.toLowerCase() &&
                    whatsappChannelIds.has(skill === null || skill === void 0 ? void 0 : skill.digitalPOCName);
            })) !== null && _c !== void 0 ? _c : [],
        };
    }, [digitalOBSkills, emailOBChannels, smsOBChannels, whatsappOBChannels]);
    const digitalOBSkillsLength = (_f = digitalOBSkills === null || digitalOBSkills === void 0 ? void 0 : digitalOBSkills.length) !== null && _f !== void 0 ? _f : 0;
    const emailOBSkillsLength = (_g = emailOBSkills === null || emailOBSkills === void 0 ? void 0 : emailOBSkills.length) !== null && _g !== void 0 ? _g : 0;
    const smsOBSkillsLength = (_h = smsOBSkills === null || smsOBSkills === void 0 ? void 0 : smsOBSkills.length) !== null && _h !== void 0 ? _h : 0;
    const whatsappOBSkillsLength = (_j = whatsappOBSkills === null || whatsappOBSkills === void 0 ? void 0 : whatsappOBSkills.length) !== null && _j !== void 0 ? _j : 0;
    return {
        emailOBChannels,
        emailOBChannelsLength,
        hasEmailOBChannels: emailOBChannelsLength > 0,
        hasOutboundChannels: outboundChannelsLength > 0,
        hasPhoneOBSkills: phoneOBSkillsLength > 0,
        hasSmsOBChannels: smsOBChannelsLength > 0,
        hasWhatsappOBChannels: whatsappOBChannelsLength > 0,
        isOutboundSkillAssigned,
        outboundChannels,
        outboundChannelsLength,
        phoneOBSkills,
        phoneOBSkillsLength,
        smsOBChannels,
        smsOBChannelsLength,
        userHaveObChannel,
        whatsappOBChannels,
        whatsappOBChannelsLength,
        hasDigitalOBSkills: digitalOBSkillsLength > 0,
        digitalOBSkills,
        digitalOBSkillsLength,
        emailOBSkills,
        emailOBSkillsLength,
        hasEmailOBSkills: emailOBSkillsLength > 0,
        smsOBSkills,
        smsOBSkillsLength,
        hasSmsOBSkills: smsOBSkillsLength > 0,
        whatsappOBSkills,
        whatsappOBSkillsLength,
        hasWhatsappOBSkills: whatsappOBSkillsLength > 0,
    };
}
//# sourceMappingURL=useGetOutboundOptions.js.map