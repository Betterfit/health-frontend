import Translator from "Helpers/Translator";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "Images/Icons/content-copy.svg";
import { ReactSVG } from "react-svg";

/**
 * @param copyText If not null, a copy button will be added which will put the copyText into the user's clipboard
 */
const ResourceDescription = ({
    label,
    items,
    copyText = null,
    copyAriaLabel = null,
}) => {
    return (
        <dl>
            <dt className="uppercase text-betterfit-graphite text-10 tracking-extra-wide leading-7">
                {Translator(label)}
            </dt>
            <div className="betterfit-grey-blue text-15 leading-7 flex flex-wrap justify-between items-center">
                <div>{items}</div>
                {copyText && (
                    <CopyToClipboard text={copyText}>
                        <button aria-label={copyAriaLabel}>
                            <ReactSVG src={CopyIcon} />
                        </button>
                    </CopyToClipboard>
                )}
            </div>
        </dl>
    );
};

export default ResourceDescription;
