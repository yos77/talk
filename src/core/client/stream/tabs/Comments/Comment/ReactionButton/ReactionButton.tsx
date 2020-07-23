import { Localized } from "@fluent/react/compat";
import cn from "classnames";
import React from "react";

import { Flex, Icon, MatchMedia } from "coral-ui/components/v2";
import { Button } from "coral-ui/components/v3";

import styles from "./ReactionButton.css";

interface ReactionButtonProps {
  onClick: () => void;
  totalReactions: number;
  reacted: boolean | null;
  label: string;
  labelActive: string;
  icon: string;
  iconActive: string | null;
  readOnly?: boolean;
  className?: string;
  isQA?: boolean;
}

function render(props: ReactionButtonProps) {
  const {
    totalReactions,
    reacted,
    readOnly,
    className,
    onClick,
    labelActive,
    label,
    icon,
    iconActive,
  } = props;

  return (
    <Button
      onClick={onClick}
      disabled={readOnly}
      className={cn(
        { [styles.readOnly]: readOnly, [styles.reacted]: reacted },
        className,
        styles.button
      )}
      aria-label={reacted ? labelActive : label}
      active={Boolean(reacted)}
      data-testid={"comment-reaction-button"}
      variant="flat"
      color="secondary"
      fontSize="small"
      fontWeight="semiBold"
      paddingSize="extraSmall"
    >
      <Flex alignItems="center" container="span">
        {props.isQA ? (
          <Icon className={styles.icon}>arrow_upward</Icon>
        ) : (
          <Icon className={styles.icon}>
            {reacted ? (iconActive ? iconActive : icon) : icon}
          </Icon>
        )}
        <MatchMedia gtWidth="xs">
          {props.isQA ? (
            <span>
              {reacted ? (
                <Localized id="qa-reaction-voted">Voted</Localized>
              ) : (
                <Localized id="qa-reaction-vote">Vote</Localized>
              )}
            </span>
          ) : (
            <span>{reacted ? labelActive : label}</span>
          )}
        </MatchMedia>
        {!!totalReactions && (
          <span className={styles.totalReactions}>{totalReactions}</span>
        )}
      </Flex>
    </Button>
  );
}

class ReactionButton extends React.Component<ReactionButtonProps> {
  public render() {
    const { reacted, isQA } = this.props;

    if (isQA) {
      return (
        <Localized
          id={reacted ? "qa-reaction-aria-voted" : "qa-reaction-aria-vote"}
          attrs={{ "aria-label": true }}
        >
          {render(this.props)}
        </Localized>
      );
    }

    return <>{render(this.props)}</>;
  }
}

export default ReactionButton;
