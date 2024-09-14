// src/components/PowerUps.js
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faForward } from '@fortawesome/free-solid-svg-icons';

const PowerUpsContainer = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  gap: 16px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  flex-wrap: wrap;
`;

const PowerUpButton = styled(motion.button)`
  position: relative;
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'available':
        return theme.colors.primary;
      case 'purchasable':
        return theme.colors.secondary;
      case 'unavailable':
        return theme.colors.disabledBackground;
      default:
        return theme.colors.disabledBackground;
    }
  }};
  color: ${({ theme, status }) => (status === 'unavailable' ? theme.colors.disabledText : 'white')};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme, status }) =>
      status !== 'unavailable' ? theme.colors.hover : theme.colors.disabledBackground};
  }
`;

const PowerUpIcon = styled(FontAwesomeIcon)`
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const PowerUpLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: center;
`;

const PowerUpCost = styled.span`
  position: absolute;
  bottom: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
  color: ${({ theme }) => theme.colors.text};
`;

const Tooltip = styled.div`
  visibility: hidden;
  background-color: ${({ theme }) => theme.colors.tooltipBackground};
  color: ${({ theme }) => theme.colors.tooltipText};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xSmall};
  border-radius: ${({ theme }) => theme.borderRadius};
  position: absolute;
  z-index: 1;
  bottom: 130%; /* Position above the button */
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;

  ${PowerUpButton}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const powerUpCost = {
  extraLife: 100,
  skipQuestion: 75,
};

function PowerUps({ powerUps, onUse, onBuy, currency }) {
  const powerUpData = [
    {
      key: 'extraLife',
      label: 'Extra Life',
      cost: powerUpCost.extraLife,
      icon: faHeart,
    },
    {
      key: 'skipQuestion',
      label: 'Skip Question',
      cost: powerUpCost.skipQuestion,
      icon: faForward,
    },
  ];

  const handleClick = (key, status, cost) => {
    if (status === 'available') {
      onUse(key);
    } else if (status === 'purchasable') {
      onBuy(key, cost);
    } else {
      // Show message or do nothing
    }
  };

  return (
    <PowerUpsContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {powerUpData.map(({ key, label, cost, icon }) => {
        const hasPowerUp = powerUps[key] > 0;
        const canAfford = currency >= cost;
        let status = 'unavailable';

        if (hasPowerUp) {
          status = 'available';
        } else if (canAfford) {
          status = 'purchasable';
        }

        const tooltipText =
          status === 'unavailable'
            ? `Need ${cost - currency} more coins to purchase`
            : hasPowerUp
            ? `Use your ${label}`
            : `Buy ${label} for ${cost} coins`;

        return (
          <PowerUpButton
            key={key}
            status={status}
            onClick={() => handleClick(key, status, cost)}
            whileHover={{ scale: status !== 'unavailable' ? 1.05 : 1 }}
            whileTap={{ scale: status !== 'unavailable' ? 0.95 : 1 }}
          >
            <PowerUpIcon icon={icon} />
            <PowerUpLabel>
              {label}
              {hasPowerUp ? ` (${powerUps[key]})` : ''}
            </PowerUpLabel>
            {!hasPowerUp && (
              <PowerUpCost>
                {canAfford ? `${cost} coins` : `Cost: ${cost} coins`}
              </PowerUpCost>
            )}
            <Tooltip>{tooltipText}</Tooltip>
          </PowerUpButton>
        );
      })}
    </PowerUpsContainer>
  );
}

export default PowerUps;