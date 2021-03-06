import { CoralRTE } from "@coralproject/rte";
import { Localized } from "@fluent/react/compat";
import { FormApi, FormState } from "final-form";
import React, {
  EventHandler,
  FunctionComponent,
  MouseEvent,
  Ref,
  useCallback,
} from "react";

import { useViewerEvent } from "coral-framework/lib/events";
import { OnSubmit } from "coral-framework/lib/form";
import { ReplyCommentFocusEvent } from "coral-stream/events";
import { AriaInfo } from "coral-ui/components/v2";
import { PropTypesOf } from "coral-ui/types";

import RTEContainer from "../../RTE";
import CommentForm from "../../Stream/CommentForm";
import ReplyTo from "./ReplyTo";

export interface ReplyCommentFormProps {
  id: string;
  className?: string;
  onSubmit: OnSubmit<any>;
  onCancel?: EventHandler<MouseEvent<any>>;
  onChange?: (state: FormState<any>, form: FormApi) => void;
  initialValues?: any;
  rteRef?: Ref<CoralRTE>;
  parentUsername: string | null;
  min: number | null;
  max: number | null;
  disabled?: boolean;
  siteID: string;
  disabledMessage?: React.ReactNode;
  rteConfig: PropTypesOf<typeof RTEContainer>["config"];
  mediaConfig: PropTypesOf<typeof CommentForm>["mediaConfig"];
}

const ReplyCommentForm: FunctionComponent<ReplyCommentFormProps> = (props) => {
  const inputID = `comments-replyCommentForm-rte-${props.id}`;
  const emitFocusEvent = useViewerEvent(ReplyCommentFocusEvent);
  const onFocus = useCallback(() => {
    emitFocusEvent();
  }, [emitFocusEvent]);

  return (
    <div>
      <CommentForm
        siteID={props.siteID}
        onSubmit={props.onSubmit}
        initialValues={props.initialValues}
        min={props.min}
        max={props.max}
        disabled={props.disabled}
        classNameRoot="createReplyComment"
        disabledMessage={props.disabledMessage}
        onFocus={onFocus}
        onCancel={props.onCancel}
        mediaConfig={props.mediaConfig}
        placeHolderId="comments-replyCommentForm-rte"
        placeholder="Write a reply"
        bodyInputID={inputID}
        bodyLabel={
          <>
            <Localized id="comments-replyCommentForm-rteLabel">
              <AriaInfo component="label" htmlFor={inputID}>
                Write a reply
              </AriaInfo>
            </Localized>
            {props.parentUsername && (
              <ReplyTo username={props.parentUsername} />
            )}
          </>
        }
        rteConfig={props.rteConfig}
      />
    </div>
  );
};

export default ReplyCommentForm;
